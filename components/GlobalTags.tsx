import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Custom CSS file */}
      <link href={asset("/global.css")} rel="stylesheet" />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />

      {/* FavIcon */}
      <link
        rel="shortcut icon"
        href="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4102/27e07532-9bed-4b33-97a9-01a1542a8e63"
      />

      <meta
        name="google-site-verification"
        content="jBotxCksnECJxZwCHXtavFJ8-f_kni3MS5Jyre2gEHc"
      />

      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: "Commissioner";
              src: url("${asset("/fonts/Commissioner-Light.woff2")}");
              font-weight: light;
            }

            @font-face {
              font-family: "Commissioner";
              src: url("${asset("/fonts/Commissioner-Medium.woff2")}");
              font-weight: medium;
            }

            @font-face {
              font-family: "Commissioner";
              src: url("${asset("/fonts/Commissioner-Regular.woff2")}");
              font-weight: regular;
            }
            
            @font-face {
              font-family: "Commissioner";
              src: url("${asset("/fonts/Commissioner-SemiBold.woff2")}");
              font-weight: 600;
            }
            @font-face {
              font-family: "Nunito";
              src: url("${asset("/fonts/Nunito-Medium.ttf")}");
              font-weight: 600;
            }
          `,
        }}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            
            fbq('init', '305982530602697');
            fbq('track', 'PageView');
          `,
        }}
      />

      <noscript>
        <img
          height="1"
          width="1"
          src="https://www.facebook.com/tr?id=305982530602697&ev=PageView&noscript=1"
        />
      </noscript>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(m, a, i, l, b, z, j, s) {
              if (m[z]) return;
              m[z] = {
                id: b,
                ready: 0
              };
              z = a.createElement(i);
              j = a.getElementsByTagName(i)[0];
              z.async = 1;
              z.src = l;
              j.parentNode.insertBefore(z, j);
            })(window, document, 'script', 'https://d3eq1zq78ux3cv.cloudfront.net/static/scripts/integration.min.js', '661e79e87058d778efdb8da6', 'MailbizIntegration');
          `,
        }}
      />

      <script
        type="text/javascript"
        async
        src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/f9b72c27-99e3-4bdd-8084-1fa8f9f30731-loader.js"
      >
      </script>
    </Head>
  );
}

export default GlobalTags;
