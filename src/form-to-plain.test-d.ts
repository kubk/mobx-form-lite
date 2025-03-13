import { test, describe } from "vitest";
import { expectTypeOf } from "vitest";
import { TextField } from "./fields/text-field";
import { BooleanField } from "./fields/boolean-field";
import { ListField } from "./fields/list-field";
import { FormToPlain } from "./form-to-plain";

describe("FormToPlain type", () => {
  test("should correctly infer primitive types", () => {
    const form = {
      name: new TextField("John"),
      age: new TextField(30),
      isActive: new BooleanField(true),
      nullValue: new TextField<string | null>(null),
    };

    type ExpectedType = {
      name: string;
      age: number;
      isActive: boolean;
      nullValue: string | null;
    };
    
    expectTypeOf<FormToPlain<typeof form>>().toEqualTypeOf<ExpectedType>();
  });

  test("should correctly infer nested object types", () => {
    const form = {
      user: {
        name: new TextField("John"),
        contact: {
          email: new TextField("john@example.com"),
          phone: new TextField("123-456-7890"),
        },
      },
      settings: {
        notifications: new BooleanField(true),
        theme: new TextField("dark"),
      },
    };

    type ExpectedType = {
      user: {
        name: string;
        contact: {
          email: string;
          phone: string;
        };
      };
      settings: {
        notifications: boolean;
        theme: string;
      };
    };
    
    expectTypeOf<FormToPlain<typeof form>>().toEqualTypeOf<ExpectedType>();
  });

  test("should correctly infer array types", () => {
    const form = {
      tags: [new TextField("tag1"), new TextField("tag2")],
      options: {
        features: [new BooleanField(true), new BooleanField(false)],
      },
    };

    type ExpectedType = {
      tags: string[];
      options: {
        features: boolean[];
      };
    };
    
    expectTypeOf<FormToPlain<typeof form>>().toEqualTypeOf<ExpectedType>();
  });

  test("should correctly infer ListField types", () => {
    const form = {
      items: new ListField([
        new TextField("item1"),
        new TextField("item2"),
      ]),
      nestedItems: new ListField([
        { name: new TextField("nested1"), active: new BooleanField(true) },
        { name: new TextField("nested2"), active: new BooleanField(false) },
      ]),
    };

    type ExpectedType = {
      items: string[];
      nestedItems: Array<{
        name: string;
        active: boolean;
      }>;
    };
    
    expectTypeOf<FormToPlain<typeof form>>().toEqualTypeOf<ExpectedType>();
  });

  test("should correctly handle complex nested structures", () => {
    const form = {
      user: {
        profile: {
          name: new TextField("John"),
          age: new TextField(30),
        },
        preferences: {
          notifications: {
            email: new BooleanField(true),
            sms: new BooleanField(false),
          },
        },
      },
      products: new ListField([
        {
          id: new TextField("p1"),
          name: new TextField("Product 1"),
          variants: [
            {
              sku: new TextField("sku1"),
              inStock: new BooleanField(true),
            },
            {
              sku: new TextField("sku2"),
              inStock: new BooleanField(false),
            },
          ],
        },
        {
          id: new TextField("p2"),
          name: new TextField("Product 2"),
          variants: [
            {
              sku: new TextField("sku3"),
              inStock: new BooleanField(true),
            },
          ],
        },
      ]),
      primitiveValue: 42,
      nullValue: null,
    };

    type ExpectedType = {
      user: {
        profile: {
          name: string;
          age: number;
        };
        preferences: {
          notifications: {
            email: boolean;
            sms: boolean;
          };
        };
      };
      products: Array<{
        id: string;
        name: string;
        variants: Array<{
          sku: string;
          inStock: boolean;
        }>;
      }>;
      primitiveValue: number;
      nullValue: null;
    };
    
    expectTypeOf<FormToPlain<typeof form>>().toEqualTypeOf<ExpectedType>();
  });
});
