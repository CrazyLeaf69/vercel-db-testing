const Page = async () => {
  const pets = await fetch("http://localhost:3000/api/pets").then((res) => res.json());
  return pets.map((pet: { name: string; owner: string }, i: string) => (
    <div key={i} className="flex flex-col gap-2 w-fit">
      <div className="text-white">{`${pet.name}. Owned by: ${pet.owner}`}</div>
    </div>
  ));
};

export default Page;
