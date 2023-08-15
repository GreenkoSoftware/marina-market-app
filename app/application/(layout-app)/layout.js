export default function LayoutApp ({ children }) {
  return (
    <section>
      <head>
        <title>Home</title>
      </head>
      <body>
      <header></header>
      {children}
      <footer></footer>
      </body>
    </section>
  );
}
