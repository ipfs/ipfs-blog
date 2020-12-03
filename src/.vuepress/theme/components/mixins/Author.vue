<script>
export default {
  props: {
    avatar: {
      type: String,
      default: null,
    },
    svgIcon: {
      type: String,
      default: null,
    },
    twitter: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
  },
}
</script>
