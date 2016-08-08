import
{
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
  view: {
      backgroundColor: '#fff',
      flex: 1,
      paddingVertical: 7.5,
      flexDirection: 'column'
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 7.5,
    borderBottomColor: "#eee",
    borderBottomWidth: 1
  },
  image_item: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    color: '#333'
  },
  image: {
    width: 100,
    height: 80,
    marginLeft: 15
  },
  multiImage_container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 8
  },
  multiImage: {
    marginLeft: 0,
    flex: 1,
    marginHorizontal: 3
  },
  itemFooter: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    minHeight: 15
  },
  source: {
    marginRight: 15,
    fontSize: 12,
    color: '#ccc'
  },
  pubDate: {
    fontSize: 12,
    color: '#ccc'
  }
});
