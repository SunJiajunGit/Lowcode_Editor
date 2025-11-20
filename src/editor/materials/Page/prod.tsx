import { CommonComponentProps } from "../../interface";
import { forwardRef } from "react";

type PageProps = Omit<CommonComponentProps, 'ref'>;

const Page = forwardRef<HTMLDivElement, PageProps>(({ id, name, children, styles }, ref) => {
    return (
        <div
            className='p-[20px]'
            style={{ ...styles }}
            ref={ref}
        >
            {children}
        </div>
    )
});

export default Page;