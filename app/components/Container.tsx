
interface Props {
    children: React.ReactNode;
}

const Container = ({children}: Props) => {
  return (
    <div className="mx-auto xl:px-20 md:px-10 sm:px-4 px-4">
        {children}
    </div>
  )
}

export default Container;