import { Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";

export default function Home() {
  const { loggedInUser: user, token } = useAppSelector(state => state.login)
  console.log("User", user)
  console.log("Token", token)

  return (
    <>
      <Typography variant="h5" component="h5" textTransform="uppercase" >
        Home
      </Typography>
    </>
  )
}
