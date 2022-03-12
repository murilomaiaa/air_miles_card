import { BaseEntity, BaseEntityProps } from './BaseEntity';

export type CreditCardCompanyPartial = {
  id: string;
  name: string;
};

export type CreditCardCompanyProps = BaseEntityProps & {
  name: string;
};

export class CreditCardCompany extends BaseEntity {
  private name: string;

  constructor(props: CreditCardCompanyProps) {
    super(props);
    this.name = props.name;
  }

  toPartial(): CreditCardCompanyPartial {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
