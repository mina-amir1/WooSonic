import React, { useEffect, useRef, useState } from 'react';
import { API_ENDPOINT } from '~/config';
import ThreedsChallengeRedirectComponent from './payments/ThreedsChallengeRedirectComponent';

const PaymentForm = ({ handleChange, handleSubmit }) => {
  const [response, setResponse] = useState(null);
  const callPay = async (sessionID: any) => {
    const apiUrl = `${API_ENDPOINT}/payment/pay.php`;
    const orderData = {
      amount: 100.06,
      currency: 'EGP',
    };
    const requestData = {
      sessionID: sessionID,
      orderData: orderData,
    };
    try {
      const response = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Connection: 'keep-alive',
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        setResponse(data);
      } else {
        throw new Error('Failed to call PAY API');
      }
    } catch (error) {
      // Handle network or parsing error
      console.error('Error:', error);
    }
  }
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://test-nbe.gateway.mastercard.com/form/version/71/merchant/TESTEGPTEST/session.js';
    document.head.appendChild(script);

    script.onload = () => {
      // Configure the PaymentSession
      PaymentSession.configure({
        fields: {
          card: {
            number: "#card-number",
            securityCode: "#security-code",
            expiryMonth: "#expiry-month",
            expiryYear: "#expiry-year",
            nameOnCard: "#cardholder-name"
          }
        },
        frameEmbeddingMitigation: ["javascript"],
        callbacks: {
          initialized: function (response) {
            // Handle initialization response
          },
          formSessionUpdate: function (response) {
            // Handle form session update response
            if (response.status) {
              if ("ok" === response.status) {
                console.log("Session updated with data: " + response.session.id);

                if (response.sourceOfFunds.provided.card.securityCode) {
                  console.log("Security code was provided.");
                }

                if (response.sourceOfFunds.provided.card.scheme === 'MASTERCARD') {
                  console.log("The user entered a Mastercard credit card.");
                }
                // callPay(response.session.id);
                // Set the response.session.id in formData
                // handleChange('sessionId', response.session.id);
                handleChange({
                  target: {
                    name: "sessionId",
                    value: response.session.id,
                  },
                });
                handleSubmit();

              } else if ("fields_in_error" === response.status) {
                console.log("Session update failed with field errors.");
                if (response.errors.cardNumber) {
                  console.log("Card number invalid or missing.");
                }
                if (response.errors.expiryYear) {
                  console.log("Expiry year invalid or missing.");
                }
                if (response.errors.expiryMonth) {
                  console.log("Expiry month invalid or missing.");
                }
                if (response.errors.securityCode) {
                  console.log("Security code invalid.");
                }
              } else if ("request_timeout" === response.status) {
                console.log("Session update failed with request timeout: " + response.errors.message);
              } else if ("system_error" === response.status) {
                console.log("Session update failed with system error: " + response.errors.message);
                console.log("Session update failed with system error: " + response);
              }
            } else {
              console.log("Session update failed: " + response);
            }
          },
          authenticationSuccessful: function (response) {
            debugger;
            // Handle successful authentication
            console.log("3-D Secure authentication successful.");
            // Perform additional actions or submit the form
            // For example: document.querySelector("#paymentForm").submit();
          },
          authenticationFailed: function (response) {
            debugger;
            // Handle failed authentication
            console.log("3-D Secure authentication failed.");
          }
        },
        // order: {
        //   amount: 100.06, // Replace with your order amount
        //   currency: "EGP" // Replace with your currency
        // },
        interaction: {
          displayControl: {
            formatCard: "EMBOSSED",
            invalidFieldCharacters: "REJECT"
          }
        }
      });

      // Add onBlur validation for each field
      const onBlurValidation = (selector, role) => {
        PaymentSession.validate('card', function (allresult) {
          if (allresult.card[role].isValid) {
            console.log("The field is valid");
            document.querySelector(selector).style.borderColor = "green";
          } else {
            console.log("The field is invalid");
            document.querySelector(selector).style.borderColor = "red";
          }
        });
      };

      PaymentSession.onBlur(["card.number", "card.nameOnCard", "card.securityCode", "card.expiryYear", "card.expiryMonth"], function (selector, role) {
        onBlurValidation(selector, role);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const pay = () => {
    PaymentSession.updateSessionFromForm('card');
  };

  return (
    <div>
      {/* <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 ok">
          <label htmlFor="card-number" className="block text-sm font-medium leading-6 text-gray-900"> Card number </label>
          <div className="mt-1">
            <input
              type="text"
              id="card-number"
              placeholder="XXXX XXXX XXXX XXXX"
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              value=""
              tabIndex="1"
              readOnly
            />
          </div>
        </div>

        <div>
          <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900"> Expiry date </label>
          <div className="mt-1">
            <div>
              <input
                type="text"
                name=""
                id="expiry-month"
                placeholder="MM"
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                value=""
                tabIndex="2"
                readOnly
              />
            </div>
            <div>
              <input
                type="text"
                name=""
                id="expiry-year"
                placeholder="YY"
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                value=""
                tabIndex="3"
                readOnly
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900"> CSV </label>
          <div className="mt-1">
            <input
              type="text"
              name=""
              id=""
              placeholder="XXX"
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              value=""
              tabIndex="4"
              readOnly
            />
          </div>
        </div>
      </div> */}
      <div>Please enter your payment details:</div>
      <span>5123450000000008</span>
      {/* <ThreedsChallengeRedirectComponent response={response} /> */}
      <h3>Credit Card</h3>
      <div>
        Card Number: <input type="text" id="card-number" className="input-field" title="card number" aria-label="enter your card number" value="" tabIndex="1" readOnly />
      </div>
      <div>
        Expiry Month:<input type="text" id="expiry-month" className="input-field" title="expiry month" aria-label="two digit expiry month" value="" tabIndex="2" readOnly />
      </div>
      <div>
        Expiry Year:<input type="text" id="expiry-year" className="input-field" title="expiry year" aria-label="two digit expiry year" value="" tabIndex="3" readOnly />
      </div>
      <div>
        Security Code:<input type="text" id="security-code" className="input-field" title="security code" aria-label="three digit CCV security code" value="" tabIndex="4" readOnly />
      </div>
      <div>
        Cardholder Name:<input type="text" id="cardholder-name" className="input-field" title="cardholder name" aria-label="enter name on card" value="" tabIndex="5" readOnly />
      </div>
      <div>
        <button id="payButton" type='button' onClick={pay}>Pay Now</button>
      </div>
    </div>
  );
};

export default PaymentForm;
