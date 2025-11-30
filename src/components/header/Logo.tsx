type LogoPropsTypes = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Logo({ onClick }: LogoPropsTypes) {
  return (
    <div className="text-xl font-semibold md:text-2xl">
      <button onClick={onClick}>KitzoCodes</button>
    </div>
  );
}
