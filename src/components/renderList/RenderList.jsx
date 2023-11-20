function RenderList({ data = [], renderItem }) {
  return data.map((props, index) => renderItem(props, index));
}
export default RenderList;
