import { useAppSelector } from '../app/hooks'
import { selectExercises } from '../features/exerciseSlice'
import { selectWorkouts } from '../features/workoutSlice'

const UserDash = () => {
  const workouts = useAppSelector(selectWorkouts)
  const exercises = useAppSelector(selectExercises)
  const now = new Date().getTime()
  const lastWeek = now - 7 * 24 * 60 * 60 * 1000
  const twoWeeks = lastWeek - 7 * 24 * 60 * 60 * 1000
  const pastWeekWorkouts = workouts.filter((workout) => new Date(workout.date).getTime() > lastWeek)
  const twoWeeksAgoWorkouts = workouts.filter(
    (workout) =>
      lastWeek > new Date(workout.date).getTime() && new Date(workout.date).getTime() > twoWeeks,
  )
  const formatAsPercent = (num: number) => {
    const calcNum = num * 100
    if (num > 0) {
      return `${parseFloat(calcNum.toString()).toFixed(1)}%`
    } else if ((num = 0)) {
      return 'There was no change!'
    } else {
      return `-${parseFloat(calcNum.toString()).toFixed(1)}%`
    }
  }

  return (
    <section className='h-full w-full flex flex-col justify-center items-center'>
      <div className='flex flex-col items-center justify-center h-full min-w-[60%] w-fit p-4 m-4 rounded-xl border border-brand'>
        <h1 className=''>Your Stats Since Joining</h1>
        <div className='flex flex-row items-center justify-evenly h-fit w-full'>
          <div className='flex flex-col items-center justify-center h-fit w-1/2 border rounded-xl border-brand m-2 p-2'>
            <h1 className='text-center text-2xl'>Total Reps:</h1>
            <h3 className='text-xl'>
              {workouts.length !== 0
                ? workouts
                    .map((workout) =>
                      workout.exercises
                        .map((exercise) => parseInt(exercise.reps) * parseInt(exercise.sets))
                        .reduce((prev, curr) => prev + curr),
                    )
                    .reduce((prev, curr) => prev + curr)
                : 'Add Workouts!'}
            </h3>
          </div>
          <div className='flex flex-col items-center justify-center h-fit w-1/2 border rounded-xl border-brand m-2 p-2 text-brand'>
            <h1 className='text-center text-2xl'>Total Weight:</h1>
            <h3 className='text-xl'>
              {workouts.length !== 0
                ? workouts
                    .map((workout) =>
                      workout.exercises
                        .map(
                          (exercise) =>
                            parseInt(exercise.reps) *
                            parseInt(exercise.sets) *
                            parseInt(exercise.weight),
                        )
                        .reduce((prev, curr) => prev + curr),
                    )
                    .reduce((prev, curr) => prev + curr)
                : 'Get Lifting!'}
            </h3>
          </div>
        </div>
        <h1 className=''>Week Over Week Numbers</h1>
        <div className='flex flex-row items-center justify-evenly h-fit w-full'>
          <div className='flex flex-col items-center justify-center h-fit w-full border rounded-xl border-brand m-2 p-2'>
            <h1 className='text-2xl'>Reps:</h1>
            <h3 className='text-xl'>
              {pastWeekWorkouts.length !== 0 && twoWeeksAgoWorkouts.length !== 0
                ? formatAsPercent(
                    pastWeekWorkouts
                      .map((workout) =>
                        workout.exercises
                          .map((exercise) => parseInt(exercise.reps) * parseInt(exercise.sets))
                          .reduce((prev, curr) => prev + curr),
                      )
                      .reduce((prev, curr) => prev + curr) /
                      twoWeeksAgoWorkouts
                        .map((workout) =>
                          workout.exercises
                            .map((exercise) => parseInt(exercise.reps) * parseInt(exercise.sets))
                            .reduce((prev, curr) => prev + curr),
                        )
                        .reduce((prev, curr) => prev + curr),
                  )
                : 'Get Lifting!'}
            </h3>
          </div>
          <div className='flex flex-col items-center justify-center h-fit w-full border rounded-xl border-brand m-2 p-2'>
            <h1 className='text-2xl'>Weight:</h1>
            <h3 className='text-xl'>
              {pastWeekWorkouts.length !== 0 && twoWeeksAgoWorkouts.length !== 0
                ? formatAsPercent(
                    pastWeekWorkouts
                      .map((workout) =>
                        workout.exercises
                          .map(
                            (exercise) =>
                              parseInt(exercise.reps) *
                              parseInt(exercise.sets) *
                              parseInt(exercise.weight),
                          )
                          .reduce((prev, curr) => prev + curr),
                      )
                      .reduce((prev, curr) => prev + curr) /
                      twoWeeksAgoWorkouts
                        .map((workout) =>
                          workout.exercises
                            .map(
                              (exercise) =>
                                parseInt(exercise.reps) *
                                parseInt(exercise.sets) *
                                parseInt(exercise.weight),
                            )
                            .reduce((prev, curr) => prev + curr),
                        )
                        .reduce((prev, curr) => prev + curr),
                  )
                : 'Get Lifting!'}
            </h3>
          </div>
        </div>
        <h1 className=''>Bodyparts Trained</h1>
        <div className='flex flex-col items-center justify-center h-fit w-full border rounded-xl border-brand m-2 p-2'>
          <h1 className='text-center text-2xl'>Total Reps:</h1>
          <h3 className='text-xl'>4848</h3>
        </div>
      </div>
    </section>
  )
}

export default UserDash
