import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import type { CreateAnimalType } from './create-animals-type';

@Controller('animals')
export class AnimalsController {
    constructor(private readonly animalsService: AnimalsService) { }

    // @Get()
    // test(): string {
    //     return "testing host domain"
    // }

    @Get("")
    // @HttpCode(404)
    async findAll(
        @Query("vaccinated") vaccinated: string,
        @Query("sex") sex: string,
        @Query("tag") tag: string,
        @Query("search") search: string,
        @Query("sort") sort: string
    ) {
        const animals = await this.animalsService.getAnimals(vaccinated, sex, tag, search, sort);
        console.log("Animals from AnimalsController:", animals);
        return animals
    }

    @Get(":id")
    findOne(@Param("id") id: string): object {
        const animal = this.animalsService.getAnimalById(id);
        return animal
    }

    @Post("")
    // @HttpCode(202)
    justCreate(@Body() createAnimalDto: CreateAnimalType, @Query('name') name: string): Array<any> {
        console.log("payload : ", createAnimalDto);
        const response = this.animalsService.createAnimal(createAnimalDto, name)
        return response as any;
    }

    @Put(":id")
    updateAnimalById(@Param("id") id: string, @Body() updateData) {
        const response = this.animalsService.updateByID(id, updateData)
        return response;
    }

    @Delete(":id")
    deleteById(@Param("id") id: string) {
        const reposne = this.animalsService.deleteByID(id)
        return reposne as any;
    }

}
