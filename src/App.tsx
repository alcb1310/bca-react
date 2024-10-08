import { Button, Typography } from "@mui/material"
import { incrementBy } from "./redux/features/counter/counterSlice"
import { useAppDispatch, useAppSelector } from "./redux/hooks"
import { useFetchBreedsQuery } from "./redux/features/dogs/dogs-api-slice"
import ChangeTheme from "./components/theme/ChangeTheme"

function App() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  const { data = [], isFetching, isError } = useFetchBreedsQuery()
  if (isError) {
    return <div>Error</div>
  }

  if (isFetching) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-screen h-screen">
      <ChangeTheme />
      <Button
        onClick={() => dispatch(incrementBy(10))}
        variant="contained" color="primary"
      >count is: {count}</Button>

      <Typography variant="h1">Hello World</Typography>

      <Typography variant="body1">Number of dogs fetched: {data.length}</Typography>

      <table>
        <thead></thead>
        <tbody>
          {data.map((breed) => (
            <tr key={breed.id}>
              <td>{breed.name}</td>
              {breed.image && <td><img src={breed.image.url} alt={breed.name} width={25} /></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
