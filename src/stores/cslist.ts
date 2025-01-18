import { defineStore } from "pinia";
import { Mode, type Customer } from "../types"
import { useCRUDStore } from "./crud";

export const useListStore = defineStore('cslist', {
  state: (): { mode: Mode, selected: Customer | null } => {
    return {
      mode: Mode.List,
      selected: null
    }
  },
  actions: {
    select_customer(customer: Customer) {
      this.selected = customer;
    },
    unselect_customer() {
      this.selected = null
    },
    toggle_mode(mode?: Mode) {
      const crudstore = useCRUDStore();
      if(this.selected && this.mode == Mode.Edit)
        this.selected = crudstore.customers.find(e => e.id == this.selected?.id)!
      
      this.mode = mode ?? Mode.List;
    },
    edit_customer() {
      this.mode = Mode.Edit;
    }
  }
})