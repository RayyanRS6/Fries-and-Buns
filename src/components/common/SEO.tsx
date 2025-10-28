import { Helmet } from "react-helmet-async";

interface Props {
  title: string;
  description?: string;
  canonical?: string;
}

const SEO = ({ title, description, canonical }: Props) => {
  const url = canonical || (typeof window !== 'undefined' ? window.location.href : undefined);
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {url && <link rel="canonical" href={url} />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {url && <meta property="og:url" content={url} />}
    </Helmet>
  );
};

export default SEO;
