import axios from "axios";
import { parseCookies } from 'nookies'

export default function Home({ categories }) {
  return categories
    ? categories.map((category) =>
      <p key={Math.random()}>{category.attributes.name}</p>
    )
    : 'hello'

}
export async function getServerSideProps(ctx) {
  try {
    const { jwt } = parseCookies(ctx)
    if (!jwt)
      return { redirect: { permanent: false, destination: '/login' }, props: {} }
    const { data: categories } = await axios.get(getStrapiURL('/categories'), { headers: { Authentication: `Bearer ${jwt}` } })
    return {
      props: {
        categories: categories.data
      }
    }
  } catch (err) {
    return { props: {} }
  }
}