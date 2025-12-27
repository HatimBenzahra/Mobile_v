"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_CONFIG = exports.StatutPorte = void 0;
exports.getStatusConfig = getStatusConfig;
exports.getAllStatuses = getAllStatuses;
exports.getProspectedStatuses = getProspectedStatuses;
exports.isProspectedStatus = isProspectedStatus;
exports.requiresRdvDateTime = requiresRdvDateTime;
exports.calculateStatsForStatus = calculateStatsForStatus;
var StatutPorte;
(function (StatutPorte) {
    StatutPorte["NON_VISITE"] = "NON_VISITE";
    StatutPorte["CONTRAT_SIGNE"] = "CONTRAT_SIGNE";
    StatutPorte["REFUS"] = "REFUS";
    StatutPorte["RENDEZ_VOUS_PRIS"] = "RENDEZ_VOUS_PRIS";
    StatutPorte["ABSENT"] = "ABSENT";
    StatutPorte["ARGUMENTE"] = "ARGUMENTE";
    StatutPorte["NECESSITE_REPASSAGE"] = "NECESSITE_REPASSAGE";
})(StatutPorte || (exports.StatutPorte = StatutPorte = {}));
exports.STATUS_CONFIG = {
    [StatutPorte.NON_VISITE]: {
        value: StatutPorte.NON_VISITE,
        description: 'Porte non visitée - statut par défaut',
        countAsProspected: false,
        incrementContratsSignes: false,
        incrementRendezVousPris: false,
        incrementRefus: false,
        requiresRdvDateTime: false,
    },
    [StatutPorte.CONTRAT_SIGNE]: {
        value: StatutPorte.CONTRAT_SIGNE,
        description: 'Contrat signé - succès commercial',
        countAsProspected: true,
        incrementContratsSignes: true,
        incrementRendezVousPris: false,
        incrementRefus: false,
        requiresRdvDateTime: false,
    },
    [StatutPorte.REFUS]: {
        value: StatutPorte.REFUS,
        description: 'Refus du prospect',
        countAsProspected: true,
        incrementContratsSignes: false,
        incrementRendezVousPris: false,
        incrementRefus: true,
        requiresRdvDateTime: false,
    },
    [StatutPorte.RENDEZ_VOUS_PRIS]: {
        value: StatutPorte.RENDEZ_VOUS_PRIS,
        description: 'Rendez-vous planifié avec le prospect',
        countAsProspected: true,
        incrementContratsSignes: false,
        incrementRendezVousPris: true,
        incrementRefus: false,
        requiresRdvDateTime: true,
    },
    [StatutPorte.ABSENT]: {
        value: StatutPorte.ABSENT,
        description: 'Personne absente - pas de réponse à la porte',
        countAsProspected: true,
        incrementContratsSignes: false,
        incrementRendezVousPris: false,
        incrementRefus: false,
        requiresRdvDateTime: false,
    },
    [StatutPorte.ARGUMENTE]: {
        value: StatutPorte.ARGUMENTE,
        description: 'Refus après discussion et argumentation commerciale',
        countAsProspected: true,
        incrementContratsSignes: false,
        incrementRendezVousPris: false,
        incrementRefus: true,
        requiresRdvDateTime: false,
    },
    [StatutPorte.NECESSITE_REPASSAGE]: {
        value: StatutPorte.NECESSITE_REPASSAGE,
        description: 'Nécessite un repassage ultérieur',
        countAsProspected: true,
        incrementContratsSignes: false,
        incrementRendezVousPris: false,
        incrementRefus: false,
        requiresRdvDateTime: false,
    },
};
function getStatusConfig(status) {
    return exports.STATUS_CONFIG[status];
}
function getAllStatuses() {
    return Object.values(StatutPorte);
}
function getProspectedStatuses() {
    return getAllStatuses().filter(status => exports.STATUS_CONFIG[status].countAsProspected);
}
function isProspectedStatus(status) {
    return exports.STATUS_CONFIG[status].countAsProspected;
}
function requiresRdvDateTime(status) {
    return exports.STATUS_CONFIG[status].requiresRdvDateTime;
}
function calculateStatsForStatus(status, count) {
    const statusKey = status;
    const config = exports.STATUS_CONFIG[statusKey];
    if (!config) {
        return {
            contratsSignes: 0,
            rendezVousPris: 0,
            refus: 0,
            absents: 0,
            argumentes: 0,
            nbPortesProspectes: 0,
        };
    }
    return {
        contratsSignes: config.incrementContratsSignes ? count : 0,
        rendezVousPris: config.incrementRendezVousPris ? count : 0,
        refus: config.incrementRefus ? count : 0,
        absents: statusKey === StatutPorte.ABSENT ? count : 0,
        argumentes: statusKey === StatutPorte.ARGUMENTE ? count : 0,
        nbPortesProspectes: config.countAsProspected ? count : 0,
    };
}
//# sourceMappingURL=porte-status.constants.js.map