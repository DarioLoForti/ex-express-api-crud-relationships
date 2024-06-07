const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const store = async (req, res) => {
  const { title, content } = req.body;

  const slug = title.toLowerCase().split(" ").join("-");

  try {
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
      },
    });

    res.json(post);
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

const index = async (req, res) => {
  try {
    const where = {};
    const { published, search, page = 1, limit = 10 } = req.query;

    if (published) {
      where.published = published === "true";
    }

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
          },
        },
        {
          content: {
            contains: search,
          },
        },
      ];
    }

    const totalPosts = await prisma.post.count({
      where,
    });

    const totalPages = Math.ceil(totalPosts / limit);

    const offset = (page - 1) * limit;

    const posts = await prisma.post.findMany({
      where,
      take: parseInt(limit),
      skip: offset,
    });

    res.json({ posts, totalPages, currentPage: parseInt(page), totalPosts });
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

const show = async (req, res) => {
  const { slug } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: {
        slug,
      },
    });

    res.json(post);
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

const update = async (req, res) => {
  const { slug } = req.params;
  const { title, content, published } = req.body;

  try {
    const post = await prisma.post.update({
      where: {
        slug,
      },
      data: {
        title,
        content,
        published,
      },
    });

    res.json(post);
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

const destroy = async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await prisma.post.delete({
      where: {
        slug,
      },
    });

    res.json(post);
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
