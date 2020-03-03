
export namespace Interfaces {
    export interface ILocationInfo {
        Version: number;
        Key: string;
        Type: string;
        Rank: number;
        LocalizedName: string;
        Country: ICountry;
        favorite: boolean;
    }

    export interface ICountry {
        ID: string;
        LocalizedName: string;
    }

    export interface IWeather {
        LocalObservationDateTime: string;
        EpochTime: number;
        WeatherText: string;
        WeatherIcon: number;
        HasPrecipitation: boolean;
        PrecipitationType: string;
        IsDayTime: boolean;
        Temperature: ITemperature;
        MobileLink: string;
        Link: string;
    }

    export interface ITemperature {
        Metric: ITemperatureUnit;
        Imperial: ITemperatureUnit;
    }

    export interface ITemperatureUnit {
        Value: number;
        Unit: string;
        UnitType: number;
    }

    export interface ICurrentWeatherFiveDayes {
        Headline: IHeadline;
        DailyForecasts: Array<IDailyForecasts>;
    }

    export interface IHeadline {
        EffectiveDate: string;
        EffectiveEpochDate: number;
        Severity: number;
        Text: string;
        Category: string;
        EndDate: string;
        EndEpochDate: number;
        MobileLink: string;
        Link: string;
    }
    export interface IDailyForecasts {
        Date: string;
        EpochDate: number;
        Temperature: ITemperatureLimts;
        Day: IPeriodStatus;
        Night: IPeriodStatus;
        Sources: Array<string>;
        MobileLink: string;
        Link: string;
    }

    export interface ITemperatureLimts {
        Minimum: ITemperatureUnit;
        Maximum: ITemperatureUnit;
    }

    export interface IPeriodStatus {
        Icon: number;
        IconPhrase: string;
        HasPrecipitation: Boolean;
    }

}