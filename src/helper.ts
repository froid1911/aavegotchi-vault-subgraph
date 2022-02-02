import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Aavegotchi, Vault } from "../generated/schema";

export function getOrCreateVault(address: Address): Vault {
    let vault = Vault.load(address.toHexString());
    if(!vault) {
        vault = new Vault(address.toHexString());
    }
    return vault;
}

export function getOrCreateAavegotchi(id: BigInt): Aavegotchi {
    let gotchi = Aavegotchi.load(id.toString());
    if(!gotchi) {
        gotchi = new Aavegotchi(id.toString());
    }
    return gotchi;
}