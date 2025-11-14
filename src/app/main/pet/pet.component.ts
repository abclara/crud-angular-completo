import { Component, OnInit } from '@angular/core'; 
//faz o modelo do component
import { Pet } from './models/pet'; 
// importa a interface Pet (modelo de dados)
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PetService } from './services/pet.service'; //serviço que faz a chamada http pro json

@Component({
    templateUrl: './pet.component.html',
    providers: [MessageService]
})
export class PetComponent implements OnInit {

    petDialog: boolean = false;

    deletePetDialog: boolean = false;

    deletePetsDialog: boolean = false;

    pets: Pet[] = [];

    pet: Pet = {};

    selectedPets: Pet[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    // instancia o service
    constructor(private petService: PetService, private messageService: MessageService) { }
    // o service tá fazendo a chamada http pra pegar os dados do json
    ngOnInit() {
        // this.petService.getPets().then(data => this.pets = data); //pegando os dados do json via service
        this.petService.getPetsAPI().then(data => {
            console.log('dados da API', data) //chamando e testando a API (no inspecionar tem que aparecer os dados)
            this.pets = data; //pegando os dados da API via service
        }); 

        this.cols = [
            { field: 'pet', header: 'Pet' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.pet = {};
        this.submitted = false;
        this.petDialog = true;
    }

    deleteSelectedPets() {
        this.deletePetsDialog = true;
    }

    editPet(pet: Pet) {
        this.pet = { ...pet };
        this.petDialog = true;
    }

    deletePet(pet: Pet) {
        this.deletePetDialog = true;
        this.pet = { ...pet };
    }

    confirmDeleteSelected() {
        this.deletePetsDialog = false;
        this.pets = this.pets.filter(val => !this.selectedPets.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pets Deleted', life: 3000 });
        this.selectedPets = [];
    }

    confirmDelete() {
        this.deletePetDialog = false;
        this.pets = this.pets.filter(val => val.id !== this.pet.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pet Deleted', life: 3000 });
        this.pet = {};
    }

    hideDialog() {
        this.petDialog = false;
        this.submitted = false;
    }

    savePet() {
        this.submitted = true;

        if (this.pet.name?.trim()) {
            if (this.pet.id) {
                // @ts-ignore
                this.pet.inventoryStatus = this.pet.inventoryStatus.value ? this.pet.inventoryStatus.value : this.pet.inventoryStatus;
                this.pets[this.findIndexById(this.pet.id)] = this.pet;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pet Updated', life: 3000 });
            } else {
                this.pet.id = this.createId();
                // @ts-ignore
                this.pet.inventoryStatus = this.pet.inventoryStatus ? this.pet.inventoryStatus.value : 'INSTOCK';
                this.pets.push(this.pet);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pet Created', life: 3000 });
            }

            this.pets = [...this.pets];
            this.petDialog = false;
            this.pet = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.pets.length; i++) {
            if (this.pets[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
