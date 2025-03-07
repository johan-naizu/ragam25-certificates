import { FC, ReactNode } from "react"
import ParticleJs from "components/Particle"
import { Container } from "@chakra-ui/react"
import Helper from "./Help"
import { useRouter } from "next/router"
const Layout: FC<Props> = (props) => {
  const adminRoutes = ["/admin2022", "/ca"]
  const router = useRouter()
  return (
    <Container >
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}>
        {/* {!adminRoutes.includes(router.asPath) ? <ParticleJs /> : null} */}
        <ParticleJs />
      </div>
      {props.children}
      <div style={{
        height: "5rem"
      }} ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}>
        {router.asPath !== "/admin2022" ? <Helper /> : null}

      </div>
    </Container>
  )
}

export default Layout
interface Props {
  children: ReactNode
}