import { destroyCookie } from "nookies"

const Logout = () => {
  return (
    <div>

    </div>
  )
}

export default Logout

export async function getServerSideProps(ctx) {
  try {
    destroyCookie(ctx, 'jwt')
    return { redirect: { permanent: false, destination: '/' }, props: {} }
  } catch (err) {
    return { redirect: { permanent: false, destination: '/' }, props: {} }
  }
}