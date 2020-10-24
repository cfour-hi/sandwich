import { UPDATE_ACTIVE_COMPONENT } from '@/editor/store/mutation-types';

export default {
  props: {
    component: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      props: JSON.parse(JSON.stringify(this.component.props)),
      style: JSON.parse(JSON.stringify(this.component.style || {})),
    };
  },

  watch: {
    props: {
      deep: true,
      handler(v) {
        this.$store.commit(UPDATE_ACTIVE_COMPONENT, { props: v });
      },
    },

    style: {
      deep: true,
      handler(v) {
        this.$store.commit(UPDATE_ACTIVE_COMPONENT, { style: v });
      },
    },
  },
};
