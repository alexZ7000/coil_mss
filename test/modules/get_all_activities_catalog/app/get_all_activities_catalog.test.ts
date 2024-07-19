import { it, describe, expect } from "vitest";
import { handler } from "../../../../src/modules/get_catalog/app/get_catalog_presenter";

describe("Get Catalog", () => {
  it("should return the catolog for hero page", async () => {
    const event = {
      headers: {
      },
    };
    const response = await handler(event, null);
    expect(response.statusCode).toBe(200);
  });

});


