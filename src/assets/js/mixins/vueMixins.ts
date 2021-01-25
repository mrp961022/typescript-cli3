import { Vue, Component } from 'vue-property-decorator';
declare module 'vue/types/vue' {
  interface Vue {
    value:string;
    eat():any;
  }
}

@Component
export class SomeMixins extends Vue {
  value = 'Hello';
  eat() {
      console.log('混入', this.value)
  }
}