"use server";
import prisma from "@/lib/db";

export const UsersGet = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const PostUserLocations = async ({
  items,
  user,
}: {
  items: { id: string; achievedAt?: Date }[];
  user: string;
}) => {
  const userLocationData = items.map((i) => {
    return {
      userId: user,
      locationId: i.id,
      achievedAt: i.achievedAt,
    };
  });

  if (!userLocationData) return;

  const createUserLocation = await prisma.userLocation.createMany({
    data: userLocationData,
    skipDuplicates: true,
  });
};

export const GetUserLocations = async ({ user }: { user: string }) => {
  const getUserLocation = await prisma.userLocation.findMany({
    where: {
      userId: user,
    },
  });
  return getUserLocation.map(({ locationId, achievedAt }) => {
    return {
      id: locationId,
      createdAt: achievedAt,
    };
  });
};

export const DeleteUserLocation = async ({
  id,
  user,
}: {
  id: string;
  user: string;
}) => {
  const deleteUserLocation = await prisma.userLocation.deleteMany({
    where: {
      userId: user,
      locationId: id,
    },
  });
};

export const PostUserCourses = async ({
  items,
  user,
}: {
  items: { id: string; achievedAt?: Date }[];
  user: string;
}) => {
  console.log(items);
  const userCourseData = items.map((i) => {
    return {
      userId: user,
      courseId: i.id,
      achievedAt: i.achievedAt,
    };
  });

  if (!userCourseData) return;

  const createUserCourse = await prisma.userCourse.createMany({
    data: userCourseData,
    skipDuplicates: true,
  });
};

export const GetUserCourses = async ({ user }: { user: string }) => {
  const getUserCourse = await prisma.userCourse.findMany({
    where: {
      userId: user,
    },
  });
  return getUserCourse.map(({ courseId, achievedAt }) => {
    return {
      id: courseId,
      createdAt: achievedAt,
    };
  });
};

export const DeleteUserCourses = async ({
  id,
  user,
}: {
  id: string;
  user: string;
}) => {
  const deleteUserLocation = await prisma.userCourse.deleteMany({
    where: {
      userId: user,
      courseId: id,
    },
  });
};
