const page = async () => {
  // here use it to check loading suspense
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return <div>Hello welcome to feed page</div>;
};

export default page;
