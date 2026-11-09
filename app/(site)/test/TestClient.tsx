"use client";

import Pokemon3D, { PokemonGallery } from "@/components/pocemon";

// Simple standalone
export default function Poc() {
    return (
        <>
    <Pokemon3D autoRotate={true} />

    <PokemonGallery />

    </>
    )
    }