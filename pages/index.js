import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import utilStyles from '../styles/utils.module.css'
import Layout from '../components/layout'
import { getSortedPostsData,getAllPostIds } from '../lib/posts'

//
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  const ids=getAllPostIds();
  console.log(ids);
  return {
    props: {
      allPostsData,
    },
  }
}

export default function Home({ allPostsData }) {
  console.log({allPostsData})
  return (
    <Layout home>
      <Head>
        <title>Home Page</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello i'm <b>Moahammed Salah</b> Junior Front-end developer with eye
          in design
        </p>
        <p>This is a blog to share my experience with you</p>
      </section>
      <section>
        <h2>Recent Blog Posts</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map((post) => {
            return (
              <li className={utilStyles.listItem} key={post.id}>
                <Link href={`/posts/${post.id}`}>
                  <a className={utilStyles.headingLg}>{post.title}</a>
                </Link>
                <br />
                <Date dateString={post.date} />
              </li>
            )
          })}
        </ul>
      </section>
      <style jsx>{`
        .link {
          color: #003365;
        }
      `}</style>
    </Layout>
  )
}
