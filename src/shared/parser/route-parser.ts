export default class RouteParser {
    static parseUrl(requestUrl: string): string {
        if (requestUrl.includes("/notified-stores/")) {
            requestUrl = requestUrl.replace(/\/notified-stores\/[0-9a-zA-Z-]+/g, "/notified-stores/:storeId");
        }
        return requestUrl
            .replace(/[?].*/g, "")
            .replace(/\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g, "/:id");
    }
}
