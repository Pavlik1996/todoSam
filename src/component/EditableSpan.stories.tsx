import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";

export default {
  title: 'Editable Span Component',
  component: EditableSpan
}

const change_title = action('change title')

export const EditableSpanExample = () => {
  return <>
   <EditableSpan oldTitle={'oldTitle'} onChange={change_title}/>
  </>
}