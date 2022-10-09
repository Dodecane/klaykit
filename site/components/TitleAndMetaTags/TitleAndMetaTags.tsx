import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

type TitleAndMetaTagsProps = {
  description?: string;
  image?: string;
  pathname?: string;
  title?: string;
  url?: string;
  color?: string;
};

export function TitleAndMetaTags({
  color = 'white',
  description = 'The best way to connect a Klaytn wallet',
  image,
  pathname,
  title = 'KlayKit',
  url = 'https://klaykit.vercel.app/',
}: TitleAndMetaTagsProps) {
  const router = useRouter();

  const imageUrl = `${url}/social/${image || 'default.png'}`;
  const path = pathname || router.pathname;

  return (
    <Head>
      <title>{title}</title>

      <meta content={description} name="description" />

      <meta content={`${url}${path}`} property="og:url" />
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={imageUrl} property="og:image" />

      <meta content="summary_large_image" name="twitter:card" />

      <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />

      <meta content={color} name="theme-color" />
    </Head>
  );
}
