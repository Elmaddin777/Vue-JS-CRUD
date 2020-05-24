let app1 = new Vue({
    el: '#app',
    data: {
        items: {
            errored: false,
            error_message: '',
            allItems: {}
        },
        form:{
            text: '',
            body: ''
        },
        modal:{
            inputText: '',
            inputBody: '',
            valueText: '',
            valueBody: '',
            id:''
        }
    },
    mounted(){
        // Get all the items
        axios
            .get('http://itemapi/api/items')
            .then(response => this.items.allItems = response.data)
            .catch(error => {
                this.items.errored = true
                this.items.error_message = `Server is not responding \u00A0\ ):`
            })
    },
    methods:{
        deleteItem(e) {
            let id = e.target.getAttribute('data-id')
            axios
                .delete('http://itemapi/api/items/'+id)
                .then(() => {
                    alert(`Item # ${id} removed`)
                    location.reload()
                })
        },
        createItem(){
            // Form is input data
            data = this.form

            axios
                .post('http://itemapi/api/items', data)
                .then(response => {
                    alert("Item #" + response.data.id + " added");
                    location.reload()
                })
                .catch(error => alert('Server not responding'))
        },
        showModal(e) {
            $("#itemModal").modal('show'); 
            this.modal.id = e.target.getAttribute('data-id')
            
            // Get item data to present in the modal
            axios
                .get('http://itemapi/api/items/' + this.modal.id)
                .then(response => {
                    this.modal.valueText = response.data.text
                    this.modal.valueBody = response.data.body
                })
        },
        editItem(){
            data = {
                text: this.modal.valueText, 
                body: this.modal.valueBody
            }

            axios
                .put("http://itemapi/api/items/" + this.modal.id, data)
                .then(response => {
                    alert("Item #" + response.data.id + " updated");
                    location.reload();
                })
        }
    }
})
