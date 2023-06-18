import { useEffect, useState } from "react";
import { API_ENDPOINT } from "~/config";
import { useTranslation } from "react-i18next";

export default function ShippingOptions({ formData, handleChange, errors }: any) {
  const { t, i18n } = useTranslation();

  const [pickFromStore, setPickFromStore] = useState(false);
  const [typeApartment, setTypeApartment] = useState(true);

  const [neighborhood, setNeighborhood] = useState([]);
  const [areas, setAreas] = useState<any[]>([]);
  const [street, setStreet] = useState('');
  const [selectedGovId, setSelectedGovId] = useState();
  const [building_no, setBuilding_no] = useState('');
  const [floor_no, setFloor_no] = useState('');
  const [apartment_no, setApartment_no] = useState('');
  const [shippingMethod, setShippingMethod] = useState('');

  const handleOptionChange = (event: any) => {
    if (event.target.value === "from_branch") {
      setPickFromStore(true);
    } else {
      setPickFromStore(false);
    }
    if (neighborhood.length > 0) {
      setSelectedGovId(neighborhood[0].id);
    }
    handleChange(event);
  };
  const handleOptionChangeType = (event: any) => {
    if (event.target.value === "villa") {
      setTypeApartment(false);
    } else {
      setTypeApartment(true);
    }
    if (neighborhood.length > 0) {
      setSelectedGovId(neighborhood[0].id);
    }
    handleChange(event);
  };

  const handleNeighborhoodChange = (event: any) => {
    const selectedNeighborhoodId = event.target.value;
    console.log('handleNeighborhoodChange')
    setSelectedGovId(selectedNeighborhoodId);
    handleChange(event);
  };

  const handleShippingMethodChange = (event: any) => {
    const selectedShippingMethod = event.target.value;
    // console.log('handleShippingMethodChange')
    setShippingMethod(selectedShippingMethod);
    handleChange(event);
  };


  const handleStreetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(event.target.value);
    handleChange(event);
  };
  const handleBuildingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuilding_no(event.target.value);
    handleChange(event);
  };
  const handleFloorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFloor_no(event.target.value);
    handleChange(event);
  };
  const handleApartmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApartment_no(event.target.value);
    handleChange(event);
  };
  const handleAreaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAreaId = event.target.value;
    const selectedArea = areas.find((area: any) => area.area_id === selectedAreaId);

    // Update the formData object with the selected area rate
    // const updatedFormData = {
    //   ...formData,
    //   shipping_fee: selectedArea ? selectedArea.rate : '',
    // };
    handleChange(event);
    handleChange({
      target: {
          name: "shipping_fee",
          value: selectedArea ? selectedArea.rate : 0,
      },
  });
  };

  useEffect(() => {
    fetch(`${API_ENDPOINT}/shipping/getGovs.php`)
      .then((response) => response.json())
      .then((data: any) => {
        setNeighborhood(data);
      })
      .catch((error) => {
        console.log('An error occurred while fetching neighborhood:', error);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/shipping/getAreas.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gov_id: selectedGovId }),
    })
      .then((response) => response.json())
      .then((data: any) => {
        if (data === 'Err in payload') {
          setAreas([]);
        } else {
          setAreas(data);
        }
      })
      .catch((error) => {
        console.log('An error occurred while fetching area:', error);
      });
  }, [selectedGovId]);

  return (
    <div>
      <ul className="grid w-full gap-6 md:grid-cols-2">
        <li>
          <input
            type="radio"
            id="shipping_method_delivery"
            name="shipping_method"
            value="delivery"
            className="hidden peer"
            defaultChecked
            onChange={handleOptionChange}
          />
          <label
            htmlFor="shipping_method_delivery"
            className="inline-flex items-center justify-between w-full h-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
          >
            <div className="block">
              <div className="w-full text-lg font-semibold">{t('checkout.ship_to_me')}</div>
            </div>
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="shipping_method_from_branch"
            name="shipping_method"
            value="from_branch"
            className="hidden peer"
            onChange={handleOptionChange}
            required
          />
          <label
            htmlFor="shipping_method_from_branch"
            className="inline-flex items-center justify-between w-full h-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
          >
            <div className="block">
              <div className="w-full text-lg font-semibold">
                {t('checkout.pick_from_branch')}
              </div>
            </div>
          </label>
        </li>
      </ul>
      {pickFromStore ? (
        <div className="w-1/2 mt-5">
          <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900 capitalize">{t('checkout.choose_branch')}</label>
          <div className="mt-1">
            <select
              key={i18n.language} // Add key prop to force re-render on language change
              onChange={handleShippingMethodChange}
              name="pick_from_branch"
              defaultValue=''
              className={`block w-full px-3 py-2 text-gray-900 capitalize rounded-md form-select border border-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${errors.pick_from_branch && 'border-red-500'}`}
            >
              <option value='' disabled>{t('checkout.choose_branch')}</option>
              <option value="cairo_branch">{t('cities.cairo')} {t('common.branch')}</option>
              <option value="giza_branch">{t('cities.giza')} {t('common.branch')}</option>
              <option value="alexandria_branch">{t('cities.alexandria')} {t('common.branch')}</option>
              <option value="aswan_branch">{t('cities.aswan')} {t('common.branch')}</option>
            </select>
            {errors.pick_from_branch && <p className="mt-1 text-xs text-red-500">{errors.pick_from_branch}</p>}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 mt-5">

          <div className="col-span-2">
            <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900 capitalize">{t('checkout.city')}</label>
            <div className="mt-1">
              <select className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md form-select placeholder:text-gray-400 sm:text-sm sm:leading-6">
                <option value="">Egypt</option>
                <option value="">Saudi Arabia</option>
                <option value="">United Arab Emirates</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900 capitalize">
              {t('checkout.neighborhood')}
            </label>
            <div className="mt-1">
              <select
                key={i18n.language} // Add key prop to force re-render on language change
                className={`block w-full px-3 py-2 text-gray-900 capitalize rounded-md form-select border border-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${errors.neighborhood && 'border-red-500'}`}
                defaultValue={formData.neighborhood}
                onChange={handleNeighborhoodChange}
                name="neighborhood"
              >
                <option value='' disabled>{t('checkout.select_neighborhood')}</option>
                {neighborhood.map((neighborhood, index): any => (
                  <option key={index} value={neighborhood.id}>
                    {i18n.language === 'ar' ? neighborhood.name_ar : neighborhood.name_en || neighborhood.name_ar}
                  </option>
                ))}
              </select>
              {errors.neighborhood && <p className="mt-1 text-xs text-red-500">{errors.neighborhood}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900 capitalize">
              {t('checkout.area')}
            </label>
            <div className="mt-1">
              <select
                key={i18n.language} // Add key prop to force re-render on language change
                className={`block w-full px-3 py-2 text-gray-900 capitalize rounded-md form-select border border-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${errors.area && 'border-red-500'}`}
                value={formData.area}
                onChange={handleAreaChange}
                name="area"
              >
                <option value='' disabled>{t('checkout.select_area')}</option>
                {areas.map((area, index) => (
                  <option key={index} value={area.area_id}>
                    {i18n.language === 'ar' ? area.name_ar : area.name_en || area.name_ar}
                  </option>
                ))}
              </select>
              {errors.area && <p className="mt-1 text-xs text-red-500">{errors.area}</p>}
            </div>
          </div>
          <div className="col-span-4">
            <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900 capitalize">{t('checkout.street_name')}</label>
            <div className="mt-1">
              <input
                type="text"
                name="street"
                className={`w-full py-2 border border-gray-300 rounded-md text-gray-900 outline-none ${errors.street && 'border-red-500'}`}
                value={street}
                onChange={handleStreetChange}
              />
              {errors.street && <p className="mt-1 text-xs text-red-500">{errors.street}</p>}
            </div>
          </div>
          <div className="col-span-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900 capitalize">{t('checkout.property_type')}</h3>
            <div className="mt-1 space-x-5">
              <label htmlFor="property_type_apartment">
                <input type="radio" name="property_type" id="property_type_apartment" value="apartment" defaultChecked onChange={handleOptionChangeType} />
                <span className="ml-2 text-sm font-medium capitalize">{t('checkout.apartment')}</span>
              </label>
              <label htmlFor="property_type_villa">
                <input type="radio" name="property_type" id="property_type_villa" value="villa" onChange={handleOptionChangeType} />
                <span className="ml-2 text-sm font-medium capitalize">{t('checkout.villa')}</span>
              </label>
            </div>
          </div>
          {typeApartment ? (
            <>
              <div>
                <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900 capitalize">{t('checkout.building_no')}</label>
                <input
                  type="text"
                  name="building_no"
                  value={building_no}
                  onChange={handleBuildingChange}
                  placeholder="12A"
                  className={`w-full py-2 border border-gray-300 rounded-md text-gray-900 outline-none sm:text-sm sm:leading-6 ${errors.building_no && 'border-red-500'}`}
                />
                {errors.building_no && <p className="mt-1 text-xs text-red-500">{errors.building_no}</p>}
              </div>
              <div>
                <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900 capitalize"> {t('checkout.floor')} </label>
                <input
                  type="text"
                  name="floor_no"
                  value={floor_no}
                  onChange={handleFloorChange}
                  placeholder="3"
                  className={`w-full py-2 border border-gray-300 rounded-md text-gray-900 outline-none sm:text-sm sm:leading-6 ${errors.floor_no && 'border-red-500'}`}
                />
                {errors.building_no && <p className="mt-1 text-xs text-red-500">{errors.floor_no}</p>}
              </div>
              <div>
                <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900 capitalize"> {t('checkout.apartment')} </label>
                <input
                  type="text"
                  name="apartment_no"
                  value={apartment_no}
                  onChange={handleApartmentChange}
                  placeholder="34"
                  className={`w-full py-2 border border-gray-300 rounded-md text-gray-900 outline-none sm:text-sm sm:leading-6 ${errors.apartment_no && 'border-red-500'}`}
                />
                {errors.building_no && <p className="mt-1 text-xs text-red-500">{errors.apartment_no}</p>}
              </div>
            </>
          ) : (
            <div>
              <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900 capitalize">{t('checkout.building_no')}</label>
              <input
                type="text"
                name="building_no"
                value={building_no}
                onChange={handleBuildingChange}
                placeholder="12A"
                className={`w-full py-2 border border-gray-300 rounded-md text-gray-900 outline-none sm:text-sm sm:leading-6 ${errors.building_no && 'border-red-500'}`}
              />
              {errors.building_no && <p className="mt-1 text-xs text-red-500">{errors.building_no}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
