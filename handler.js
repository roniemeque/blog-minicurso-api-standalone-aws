import { getCollection } from "./lib/db";
import { sluggify } from "./helpers/strings";
import { success, fail } from "./lib/responses";

// pega todos os posts do user
export const busca_posts = async ({ pathParameters }) => {
  const { user_id: userId } = pathParameters || {};
  if (!userId) {
    return fail({ error: "falta user_id. Ex: /api/fulano/criar" });
  }

  try {
    const { collection, dbComCache } = await getCollection("posts");

    const posts = await collection
      .find({ userId })
      .sort({ date: -1 })
      .toArray();

    return success({
      posts,
      dbComCache,
      userId
    });
  } catch (error) {
    return fail({ error, userId });
  }
};

// pega um post especifico do user com post_path
export const busca_post = async ({ pathParameters }) => {
  const { user_id: userId, post_path: postPath } = pathParameters || {};
  if (!userId) {
    return fail({ error: "falta user_id. Ex: /api/fulano/criar" });
  }

  try {
    const { collection, dbComCache } = await getCollection("posts");

    const [post] = await collection.find({ path: postPath, userId }).toArray();

    return success({
      post,
      dbComCache,
      userId,
      postPath
    });
  } catch (error) {
    return fail({ error, userId, postPath });
  }
};

// deleta um post especifico do user com post_path
export const apaga_post = async ({ pathParameters }) => {
  const { user_id: userId, post_path: postPath } = pathParameters || {};
  if (!userId) {
    return fail({ error: "falta user_id. Ex: /api/fulano/criar" });
  }

  try {
    const { collection, dbComCache } = await getCollection("posts");

    await collection.deleteOne({ path: postPath, userId });

    return success({
      dbComCache,
      userId,
      postPath
    });
  } catch (error) {
    return fail({ error, userId, postPath });
  }
};

// cria um novo post
export const cria_post = async ({ pathParameters, body }) => {
  const { user_id: userId } = pathParameters || {};
  if (!userId) {
    return fail({ error: "falta user_id. Ex: /api/fulano/criar" });
  }

  const parsedBody = JSON.parse(body);

  try {
    const { collection, dbComCache } = await getCollection("posts");

    // separando tags
    const tags = parsedBody.tags
      .split(",")
      .map(tag => tag.trim().toLowerCase());

    // criando slug do path
    const path = `${sluggify(parsedBody.titulo)}-${Math.floor(
      Math.random() * 999
    )}`;

    const { insertedId } = await collection.insertOne({
      ...parsedBody,
      userId,
      path,
      tags,
      date: new Date()
    });

    return success({
      insertedId,
      path,
      dbComCache,
      userId,
      parsedBody
    });
  } catch (error) {
    return fail({ error, userId, parsedBody });
  }
};
