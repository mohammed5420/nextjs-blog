import Head from 'next/head'
import Date from '../../components/date'
import Layout from '../../components/layout'
import codeHighLight from 'highlight.js'
import javascript from "highlight.js/lib/languages/javascript"
import { getAllPostIds, getPostById } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'
import Script from 'next/script'
import {useEffect} from "react"
export async function getStaticPaths() {
  const paths = getAllPostIds()
  console.log({ paths })
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  console.log({ params })
  const postData = await getPostById(params.id)

  return {
    props: {
      postData,
    },
  }
}
export default function Post({ postData }) {
  useEffect(() => {
    codeHighLight.registerLanguage("javascript",javascript);
    codeHighLight.highlightAll();
  },[])
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}
