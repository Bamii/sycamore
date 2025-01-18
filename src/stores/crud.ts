import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type Customer } from '../types'

export const useCRUDStore = defineStore('counter', () => {
  const customers = ref<(Customer & { id: number, created_at: number })[]>([{
    id: Date.now(),
    firstname: 'bame',
    lastname: 'save',
    email: 'b@g.co',
    phone_number: '08073716585',
    state: 'Lagos',
    active: true,
    details: "something fishy",
    created_at: Date.now()
  }]);
  
  const filters = ref<Map<string, string | number | boolean>>(new Map());
  
  const filtered = computed(() => {
    return customers.value
      .filter((customer: Customer) => {
        const entries = filters.value.entries()
        let entry = entries.next();
        
        while (!entry.done) {
          const [key, value] = entry.value;
          if(!process_filter(key, customer[key]!, value)) {
            return false;
          }
          entry = entries.next();
        }
        return true;
      })
      .sort((a, b) => a.created_at > b.created_at ? -1 : 1)
  })

  function process_filter<T = string | boolean>(key: string, value: T, value_from_filter: T) {
    if (!value_from_filter) return true;
    
    switch (typeof value) {
      case 'string': {
        if (value_from_filter && value.toLowerCase().includes(value_from_filter.toLowerCase())) {
          return true;
        }
        break;
      }
      
      case 'boolean': {
        if (value_from_filter && value == value_from_filter) {
          return true;
        }
        break;
      }
    }

    return false;
  }

  function search(field: string, value: string) {
    filters.value.set(field, value);
  }
    
  function unsearch(field: string) {
    filters.value.delete(field)
  }
  
  function create(customer: Customer) {
    customers.value.push({ ...customer, created_at: Date.now(), id: Date.now() })
  }
  
  function update(id: string, data: Partial<Customer>) {
    const index = customers.value.findIndex(e => e.id == id)
    customers.value[index] = {
      ...customers.value[index],
      ...data
    }
  }
  
  function ddelete(id: string) {
    customers.value = customers.value.filter(e => e.id !== id)
  }

  return { 
    customers, search, filter: search, 
    filters, filtered, create, update, 
    delete: ddelete, unsearch
  }
})
