<template>
  <ul class="list">
    <li v-for="(item, index) in list" :key="item[sortKey]" class="item">
      <slot name="item" :item="item" />
      <el-button
        type="text"
        icon="el-icon-sort-up"
        :disabled="index === 0"
        @click="$emit('move', index, -1)"
      />
      <el-button
        type="text"
        icon="el-icon-sort-down"
        :disabled="index === list.length - 1"
        @click="$emit('move', index, 1)"
      />
      <el-button
        type="text"
        icon="el-icon-delete"
        :disabled="disableDelete.includes(item[sortKey])"
        @click="$emit('delete', index)"
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Sort',

  props: {
    list: {
      type: Array,
      required: true,
    },

    sortKey: {
      type: String,
      default: 'id',
    },

    disableDelete: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
