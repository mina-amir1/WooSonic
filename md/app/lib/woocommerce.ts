import WooCommerceRestApi from "woocommerce-rest-ts-api";

export const woo = new WooCommerceRestApi({
    url: "https://honorable-nachos.localsite.io?username=survey&password=makeshift",
    consumerKey: "ck_a531be63b4c4d4782740f48d0269f20ada341fb7",
    consumerSecret: "cs_235666485463566634375908b90462cf65905941",
    version: "wc/v3",
    queryStringAuth: true // Force Basic Authentication as query string true and using under HTTPS
});
