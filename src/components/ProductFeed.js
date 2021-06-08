import Product from "./Product";

const ProductFeed = ({ products }) => {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-32 lg:-mt-52">
      {products
        .slice(0, 4)
        .map(({ id, price, category, title, image, description }) => (
          <Product
            key={id}
            id={id}
            price={price}
            category={category}
            image={image}
            title={title}
            description={description}
          />
        ))}

      <img
        className="md:col-span-full"
        src="https://hackerman-links.vercel.app/fh3f"
        alt="Advertisment"
      />

      <div className="md:col-span-2">
        {products
          .slice(4, 5)
          .map(({ id, price, category, title, image, description }) => (
            <Product
              key={id}
              id={id}
              price={price}
              category={category}
              image={image}
              title={title}
              description={description}
            />
          ))}
      </div>

      {products
        .slice(5)
        .map(({ id, price, category, title, image, description }) => (
          <Product
            key={id}
            id={id}
            price={price}
            category={category}
            image={image}
            title={title}
            description={description}
          />
        ))}
    </div>
  );
};

export default ProductFeed;
