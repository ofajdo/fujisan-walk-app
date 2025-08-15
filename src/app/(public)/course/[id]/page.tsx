import { Overview } from "@/components/location/overview";
import { CourseRouteRoad } from "@/components/map/CourseRouteRoad";
import { CourseGetById } from "@/data/courses";

export default async function Course({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await CourseGetById(id);

  return (
    <>
      <ol className="flex flex-col gap-8">
        {course?.locations.map((location, index) => {
          return (
            <li key={index}>
              <div className="w-full p-2 bg-gray-100 rounded-xl shadow-md">
                <Overview location={location} />
              </div>
            </li>
          );
        })}
      </ol>
      {course && <CourseRouteRoad route={course.routes} />}
    </>
  );
}
