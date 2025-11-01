import { ref, nextTick } from 'vue'

export function useModal() {
  const modal = ref();
  const nav = ref();
  const rootPage = ref(null);
  const currentPage = ref(null);

  const onWillPresent = async () => {
    await nextTick();
    const navEl = nav.value.$el;
    navEl.setRoot(rootPage.value, { nav: navEl, nextPage, back })
  }

  const open = async (pageComponent: any) => {
    rootPage.value = pageComponent;
    currentPage.value = pageComponent;
    await modal.value.$el.present();
  }

  const nextPage = async (pageComponent: any) => {
    const navEl = nav.value.$el;
    currentPage.value = pageComponent;
    await navEl.push(pageComponent, { nav: navEl, nextPage, back });
  }

  const back = async () => {
    const navEl = nav.value.$el;

    if (await navEl.canGoBack()) {
      await navEl.pop();
    } else {
      await modal.value?.$el.dismiss();
    }
  };

  return { modal, nav, onWillPresent, open, nextPage, back }
}
