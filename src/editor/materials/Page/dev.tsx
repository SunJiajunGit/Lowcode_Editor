import { CommonComponentProps } from "../../interface";
import { useMaterailDrop } from "../../hooks/useMaterailDrop";

function Page({ id, name, children, styles }: CommonComponentProps) {

    const {canDrop, drop } = useMaterailDrop([
        'Button', 'Container', 'Modal', 'Table', 'Form', 'DatePicker', 'Image', 
        'Input', 'Select', 'Switch', 'Progress', 'Tag', 'RichTextEditor', 'LocationPicker'
    ], id);

    return (
        <div
            data-component-id={id}
            ref={drop}
            className='p-[20px] h-[100%] box-border'
            style={{ ...styles, border: canDrop ? '2px solid blue' : 'none' }}
        >
            {children}
        </div>
    )
}

export default Page;