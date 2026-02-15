import { Injectable, NotFoundException } from '@nestjs/common';
import animalsData from "../data/animals.json";
import { CreateAnimalType } from './create-animals-type';
import { response } from 'express';

@Injectable()
export class AnimalsService {

    getAnimals(vaccinated: string, sex: string, tag: string, search: string, sort: string) {
        console.log("queries : ", sex, vaccinated);
        return animalsData.filter((animal) => {
            return (!vaccinated || animal.vaccinated === (vaccinated === "true"))
                && (!sex || animal.sex.toLowerCase() === sex.toLowerCase())
                && (!tag || animal.tags.includes(tag))
                && (!search || animal.name.toLowerCase().includes(search.toLowerCase()))
                && (!sort || sort === "asc"? animalsData : animalsData.reverse())
        })
    }

    getAnimalById(id: string): object {
        const animal = animalsData.find(animal => animal.id === id)
        if (!animal) {
            throw new NotFoundException("Animal not found");
        }
        return animal
    }

    createAnimal(createAnimalDto, name: string) {
        const newAnimal: CreateAnimalType = {
            id: createAnimalDto.id,
            name: name,
            age: createAnimalDto.age
        }
        animalsData.push(newAnimal as any)
        console.log("animalss : ", animalsData);
        return animalsData
    }

    deleteByID(id: string) {
        const index = animalsData.findIndex(animal => animal.id === id)
        if (index == -1 || index == undefined) {
            console.log("Index not found");
            return
        }
        console.log("Index found : ", index);

        const deletedItem = animalsData.splice(index, 1)
        if (deletedItem.length === 0) {
            throw new NotFoundException("Animal not found");
            return
        }
        console.log("deletedItem : ", deletedItem);

        return deletedItem
    }

    updateByID(id, updateData) {
        const response = animalsData.forEach((animal, index) => {
            if (animal.id === id) {
                animalsData[index] = updateData
            }
        })
        console.log("responseasdad : ", animalsData);
        return animalsData
    }

}

