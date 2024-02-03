interface ContainerProps {
    children: React.ReactNode
};

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div
            className="
          max-w-[2520px]
          relative
          mx-auto
          p-6
          xl:px-10 
        "
        >
            {children}
        </div>
    );
}

export default Container;
