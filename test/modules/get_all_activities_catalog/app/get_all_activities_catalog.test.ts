import { it, describe, expect } from "vitest";
import { ActivityMock } from "../../../../src/core/structure/mocks/ActivityMock";
import { handler } from "../../../../src/modules/get_all_activities_catalog/app/get_all_activities_catalog_presenter";

describe("Get All Activities Catalog", () => {
  it("should return all activities", async () => {
    const activityMock = new ActivityMock();
    const event = {
      headers: {
      },
    };
    const response = await handler(event, null);
    expect(response.statusCode).toBe(200);
    console.log(response.body);
  });

});


