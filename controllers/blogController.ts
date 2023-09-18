import pb from "./pocketbase";

export const createBlog = async (data: FormData) => {
  try {
    const record = await pb.collection("blogs").create(data);
    return record;
  } catch (error) {
    return { error: error };
  }
};

export const deleteBlog = async (id: string) => {
  try {
    const record = await pb.collection("blogs").delete(id);
    return record;
  } catch (error) {
    return { error: error };
  }
};

export const getBlog = async (id: string) => {
  try {
    const record = await pb.collection("blogs").getOne(id);
    return record;
  } catch (error) {
    return { error: error };
  }
};

export const getAllBlogs = async () => {
  try {
    const record = await pb.collection("blogs").getFullList();
    return record;
  } catch (error) {
    return { error: error };
  }
};

export const updateBlog = async (id: string, data: FormData) => {
  try {
    const record = await pb.collection("blogs").update(id, data);
    return record;
  } catch (error) {
    return { error: error };
  }
};

export const deleteBlogs = async () => {
  try {
    const record = await getAllBlogs();
    if (Array.isArray(record)) {
      record.forEach(async (blog) => {
        await deleteBlog(blog.id);
      });
    }
    return await getAllBlogs();
  } catch (error) {
    return { error: error };
  }
};

export const getList = async (page: number = 1, perPage: number = 20) => {
  try {
    const resultList = await pb.collection("blogs").getList(page, perPage);
    return resultList;
  } catch (error) {
    return { error: error };
  }
};
