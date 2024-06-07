const { th } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bodyData = {
  title: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Name is required.",
      bail: true,
    },
    isString: {
      errorMessage: "Name must be a string.",
      bail: true,
    },
    isLength: {
      errorMessage: "Name should be at least 3 characters.",
      options: { min: 3 },
    },
  },
  image: {
    in: ["body"],
    isString: {
      errorMessage: "Image must be a string.",
      bail: true,
    },
    isURL: {
      errorMessage: "Image must be a valid URL.",
    },
  },
  content: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Content is required.",
      bail: true,
    },
    isString: {
      errorMessage: "Content must be a string.",
      bail: true,
    },
    isLength: {
      errorMessage: "Content should be at least 10 characters.",
      options: { min: 10 },
    },
  },
  categoryId: {
    in: ["body"],
    isInt: {
      errorMessage: "Category ID must be an integer.",
      bail: true,
    },
    custom: {
      options: async (value) => {
        const categoryId = parseInt(value);
        const category = await prisma.category.findUnique({
          where: {
            id: categoryId,
          },
        });

        if (!category) {
          return Promise.reject(`Category with ID ${categoryId} not found.`);
        }
      },
    },
  },
  tags: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Tags is required.",
      bail: true,
    },
    isArray: {
      errorMessage: "Tags must be an array.",
      bail: true,
    },
    custom: {
      options: async (value) => {
        if (value.length === 0) {
          throw new Error("Tags must have at least one item.");
        }
        const notIntegerId = value.find((tag) => isNaN(parseInt(tag)));
        if (notIntegerId) {
          throw new Error("Tag ID must be an integer.");
        }
        const tags = await prisma.tag.findMany({
          where: {
            id: {
              in: value,
            },
          },
        });
        if (tags.length !== value.length) {
          throw new Error("Some tags not found.");
        }
        return true;
      },
    },
  },
};

module.exports = {
  bodyData,
};
