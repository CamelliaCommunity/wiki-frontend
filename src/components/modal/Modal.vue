<script>
  export default {
    name: 'Modal',
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<template>
    <div class="fixed inset-0 bg-background-1/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="modal">
        <header class="modal-header">
          <slot name="header">
            This is a Modal
          </slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
          >
            X
          </button>
        </header>
        <div class="gradient-line"></div>
        <section class="modal-body">
          <slot name="body">
            body
          </slot>
        </section>
  
        <footer class="modal-footer">
          <slot name="footer">
            footer
          </slot>
          <button
            type="button"
            class="btn-green"
            @click="close"
          >
            close buttons
          </button>
        </footer>
      </div>
    </div>
</template>

<style>
  .modal {
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    line-height: normal;
    gap: 10px;
    padding: 20px;
    border-radius: 8px;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    box-shadow: 0 32px 40px 0 rgba(0, 0, 0, 0.24), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.1);
    background-color: rgba(40, 24, 36, 0.60);
  }

  .modal-header,
  .modal-footer {
    /* padding: 10px; */
    display: flex;
  }

  .modal-header {
    position: relative;
    font-size: 36px;
    font-weight: 600;
    /* border-bottom: 1px solid #eeeeee; */
    /* justify-content: space-between; */
  }

  .modal-footer {
    /* border-top: 1px solid #eeeeee; */
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    font-size: 18px;
    /* padding: 20px 10px; */
  }
</style>