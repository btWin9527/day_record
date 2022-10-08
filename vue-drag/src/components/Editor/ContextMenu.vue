<template>
  <div
      :style="{
        top: menuTop + 'px',
        left: menuLeft+ 'px'
      }"
      v-show="menuShow"
      class="contextmenu">
    <ul @mouseup="handleMouseUp">
      <template v-if="curComponent">
        <template v-if="!curComponent.isLock">
          <li v-for="item in menuList" :key="item.id" @click="item.click">{{ item.text }}</li>
        </template>
        <li v-else @click="unlock">解锁</li>
      </template>
      <li v-else @click="paste">粘贴</li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data() {
    return {
      copyData: null,
      menuList: [
        // {id: 1, text: '复制', click: this.copy},
        {id: 2, text: '粘贴', click: this.paste},
        // {id: 3, text: '剪切', click: this.cut},
        {id: 4, text: '删除', click: this.deleteComponent},
        // {id: 5, text: '锁定', click: this.lock},
        {id: 6, text: '置顶', click: this.topComponent},
        {id: 7, text: '置底', click: this.bottomComponent},
        {id: 8, text: '上移', click: this.upComponent},
        {id: 9, text: '下移', click: this.downComponent},
      ]
    }
  },
  computed: {
    ...mapState('base', ['curComponent']),
    ...mapState('contextmenu', ['menuTop', 'menuLeft', 'menuShow']),
  },
  methods: {
    commitEvent({module = 'base', event, payload}) {
      this.$store.commit(`${module}/${event}`, payload)
    },
    lock() {
      this.commitEvent({event: 'lock'})
    },

    unlock() {
      this.commitEvent({event: 'unlock'})
    },
    paste() {
      this.commitEvent({module: 'copy', event: 'paste'})
    },
    // 点击菜单时不取消当前组件的选中状态
    handleMouseUp() {
      this.commitEvent({event: 'setClickComponentStatus', payload: true})
    },
    deleteComponent() {
      this.commitEvent({event: 'deleteComponent'})
    },

    upComponent() {
      this.commitEvent({event: 'upComponent'})
    },

    downComponent() {
      this.commitEvent({event: 'downComponent'})
    },

    topComponent() {
      this.commitEvent({event: 'topComponent'})
    },

    bottomComponent() {
      this.commitEvent({event: 'bottomComponent'})
    },
  },
}
</script>

<style lang="scss" scoped>
.contextmenu {
  position: absolute;
  z-index: 1000;

  ul {
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    box-sizing: border-box;
    margin: 5px 0;
    padding: 6px 0;

    li {
      font-size: 14px;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;

      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
}
</style>